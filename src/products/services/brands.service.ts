import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dto/brand.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((b) => b.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId++;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands = [...this.brands, newBrand];
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);

    if (!brand) {
      return null;
    }

    const indexBrand = this.brands.findIndex((b) => b.id === id);
    this.brands[indexBrand] = {
      ...brand,
      ...payload,
    };

    return this.brands[indexBrand];
  }

  delete(id: number) {
    const indexBrand = this.brands.findIndex((b) => b.id === id);

    if (indexBrand === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    this.brands.splice(indexBrand, 1);
    return true;
  }
}