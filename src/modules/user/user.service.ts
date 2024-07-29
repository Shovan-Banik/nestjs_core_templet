import { Injectable, Inject } from '@nestjs/common';
import { UserModel } from '../../models';
import { UserDto } from '../../dto';
import { USER_REPOSITORY, DATABASE_CONNECTION } from '../../config/constants';
import { Sequelize } from 'sequelize-typescript';

@Injectable() 
export class UserService { 
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel,
        @Inject(DATABASE_CONNECTION) private DB: Sequelize

    ) { }

    async create(user): Promise<UserModel> {

        return await this.userRepository.create<UserModel>(user);
    }

    async findOneByEmail(email: string): Promise<UserModel> {

        return await this.userRepository.findOne<UserModel>({ where: { email } });
    }

    async callStoreProcedure(the_input_paramenters_required: string) : Promise<any>{
        
        return await this.DB.query(`EXEC SW_PROC_CURRENCY @Flag = 'GetActiveList'`)
    }
}


