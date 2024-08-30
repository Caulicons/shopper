import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measure } from '../entities/measure.entity';
import { Repository } from 'typeorm';
import { MeasureRegisterDTO } from '../dto/measure.register.dto';
import { MeasureConfirmDTO } from '../dto/measure.confirm.dto';
import { CustomerService } from '../../customer/services/customer.service';
import { GeminiService } from '../../../gemini/services/gemini.services';

import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MeasureService {
  constructor(
    @InjectRepository(Measure)
    private readonly measureRepository: Repository<Measure>,
    private readonly customerService: CustomerService,
    private readonly geminiService: GeminiService,
  ) {}

  async upload(body: MeasureRegisterDTO) {
    // Check if the user exist
    const customer = await this.customerService.findOne(body.customer_code);
    if (!customer)
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

    // Check if already exist a measure of this type in the month
    const alreadyRegister = await this.alreadyRegisterThisMonth(
      new Date(body.measure_datetime),
      body.measure_type,
      customer.measurements,
    );

    if (alreadyRegister)
      throw new HttpException(
        `Leitura de ${body.measure_type} do mês ${new Date(body.measure_datetime).getMonth() + 1} já realizada`,
        HttpStatus.CONFLICT,
      );

    // Check image in Gemini
    const analyzeInfo = JSON.parse((await this.analyzeImage(body.image)).text);
    if (!analyzeInfo.success)
      throw new HttpException('Image not recognized', HttpStatus.BAD_REQUEST);

    // Save the measure in the database
    const uuid = uuidv4();
    const image_url = await this.createImageURL(uuid, body.image);

    const { measure_value, measure_uuid } = await this.measureRepository.save({
      image_url: image_url,
      measure_value: analyzeInfo.measure_value,
      measure_uuid: uuid,
      ...body,
    });

    return { image_url, measure_value, measure_uuid };
  }

  async confirm({ measure_uuid, confirmed_value }: MeasureConfirmDTO) {
    const measure = await this.measureRepository.findOne({
      where: { measure_uuid },
    });

    if (!measure)
      throw new HttpException(
        'Leitura do mês já realizada',
        HttpStatus.NOT_FOUND,
      );

    if (measure.has_confirmed)
      throw new HttpException(
        'Leitura do mês já confirmada',
        HttpStatus.CONFLICT,
      );

    await this.measureRepository.save({
      ...measure,
      has_confirmed: true,
      measure_value: confirmed_value,
    });

    return {
      success: true,
    };
  }

  async customer_measures(customer_code: string, measure_type?: string) {
    if (measure_type && measure_type !== 'WATER' && measure_type !== 'GAS')
      throw new HttpException(
        'Tipo de medição não permitida',
        HttpStatus.BAD_REQUEST,
      );

    const customer = await this.customerService.findMeasures(
      customer_code,
      measure_type,
    );

    if (!customer)
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);

    if (!customer.measurements)
      throw new HttpException(
        'Nenhuma leitura encontrada',
        HttpStatus.NOT_FOUND,
      );

    return {
      customer_code,
      measures: customer.measurements,
    };
  }

  private async createImageURL(uuid: string, image: string) {
    // Generate a temporary file to store the image
    const buffer = Buffer.from(image, 'base64');
    const fileName = `${uuid}.png`;
    const filePath = path.join(
      __dirname,
      '../../../../..',
      'public',
      'images',
      fileName,
    );

    // Save the file temporarily
    await fs.promises.writeFile(filePath, buffer);

    // Return the URL to access the image
    return `http://localhost:4000/images/${fileName}`;
  }

  private async alreadyRegisterThisMonth(
    data: Date,
    type: string,
    measures: Measure[],
  ) {
    for (const measure of measures) {
      const measureDate = new Date(measure.measure_datetime);
      if (
        measure.measure_type == type &&
        measureDate.getFullYear() === data.getFullYear() &&
        measureDate.getMonth() === data.getMonth()
      )
        return true;
    }
    return false;
  }

  private async analyzeImage(image: string) {
    const prompt = `
Image Validation: Analyze the image provided to determine whether it contains a water or gas meter.
If the image contains a water or gas meter, set "success" to true.
If the image does not contain a water or gas meter, set "success" to false.
Reading Extraction: If the previous answer indicates that the image contains a meter ("success": true), extract the reading value displayed on the meter.
If the reading is successful, return the numerical value read from the meter in "measure_value".
If the value cannot be parsed (for example, because the image is blurry or unreadable),
return 0 in "measure_value".
Response Format: Return the result in the following format: {"success": boolean, "measure_value": number}.
Examples: Image with a clearly visible water meter and reading 5678: {"success": true, "measure_value": 5678}
Image with a gas meter, but the reading is not clear:
{"success": true, "measure_value": 0}
Image of an object that is not a meter:
{"success": false, "measure_value": 0}
    `;

    const text = await this.geminiService.generateTextFromImageBase64(
      prompt,
      image,
    );

    return text;
  }
}
