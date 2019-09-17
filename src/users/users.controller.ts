import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Logger,
    Query,
    Param,
    HttpCode,
    Header,
    Res,
    HttpStatus,
    Delete,
    HttpException,
    UseFilters,
    UsePipes,
    UseGuards,
    UseInterceptors,
    Inject,
} from '@nestjs/common';
import { UserDetailsDto } from './dto/userDetails.dto';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserRole } from './dto/userRole.dto';
import { Users } from './users.interface';
import { AddUserDto } from './dto/addUser.dto';
import { UsersService } from './users.service';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { HTTPExceptionFilter } from '../exceptions/HTTPException.filter';
import { JoiValidationPipe } from '../pipes/joiValidation.pipe';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ParseIntPipe } from '../pipes/parseInt.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/excludeNull.interceptor';
import { ErrorsInterceptor } from '../interceptors/errors.interceptor';
import { TimeoutInterceptor } from '../interceptors/timeout.interceptor';
import { User } from '../decorators/user.decorator';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/createUser.dto';

@ApiUseTags('用户')
@ApiBearerAuth()
@UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor)
// @UseInterceptors(TransformInterceptor)
// @UseInterceptors(ExcludeNullInterceptor)
// @UseInterceptors(TimeoutInterceptor)
@UseInterceptors(ErrorsInterceptor)
// @UseInterceptors(new LoggingInterceptor())
// @UseFilters(new HTTPExceptionFilter())
@Controller('users')
export class UsersController {
    // private userService = new UsersService();

    // @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
    constructor(private readonly userService: UsersService) {}

    // @Get()
    // async findAll(): Promise<any> {
    //   return { msg: '你瞅啥' };
    // }
    @Get()
    findAll(@Res() res) {
        // res.status(HttpStatus.OK).json(['你瞅啥']);
        // res.status(HttpStatus.CREATED).send();
        return this.userService.findAll();
    }

    @Get('userList')
    async userList(@Req() request) {
        // console.log('===>>>', request.body);
        return this.userService.getUserList();
    }

    @Post('userList2')
    async userList2(@Body() usersDetailsDto: UserDetailsDto, @User('roleCode') user: Users) {
        // console.log('===>>>', request.body);
        console.log('user ===>>>', user);
        return this.userService.getUserList();
    }

    @Roles('admin')
    @Post('userDetails')
    // @UsePipes(new JoiValidationPipe({ userId: 0, userName: '嘉文四世', roleName: '德玛西亚', roleCode: 'DMXY' }))
    // @UsePipes(new ValidationPipe())
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 200, description: '请求成功' })
    async userDetails(@Body(new ParseIntPipe()) usersDetailsDto: UserDetailsDto, @Req() request) {
        // console.log('request.body===>>>', request.body);
        return [{ id: 1, name: '盲僧瞎子啊', age: 18, flag: 'userDetails' }];
        // return null;
    }

    @Post('createUser')
    @HttpCode(200)
    // @ApiImplicitQuery({ name: 'role', enum: ['Admin', 'DMXY', 'AONY', 'AYD', 'FLEZD'] })
    // async createUser(@Query('role') role: UserRole = UserRole.dmxy) {
    //     // role returns: UserRole.Admin, UserRole.Moderator OR UserRole.User
    //     if ('Admin' === role) {
    //         return [{ message: '管理员' }];
    //     } else {
    //         return [{ role: UserRole.dmxy }];
    //     }
    // }
    async createUser(@Body() createUserDto: CreateUserDto) {
        // role returns: UserRole.Admin, UserRole.Moderator OR UserRole.User
        return this.userService.createUser(createUserDto);
    }

    @Delete('deleteUser')
    @Header('Cache-Control', 'none')
    @ApiImplicitQuery({ name: 'role', enum: ['Admin', 'DMXY', 'AONY', 'AYD', 'FLEZD'] })
    async deleteUser(@Body() addUserDto: AddUserDto, @Req() request, @Query('role') role: UserRole = UserRole.dmxy) {
        // console.log('request.headers===>>>', request.headers);
        return this.userService.deleteUser(1);
    }

    @Post('user/:userId')
    @ApiImplicitParam({ name: 'userId', enum: [111, 222, 333, 444, 555, 666] })
    async userItem(@Body() addUserDto: AddUserDto, @Param('userId') userId, @Req() request, @Res() res) {
        console.log('request.param===>>>', request.params);
        // return [{ id: 1, name: '哈啊哈', age: 18, flag: `userId：${userId}` }]; // 使用了 @Res 后就必须用 res 返回，不然无法返回
        // res.status(HttpStatus.OK).json(['你瞅啥', `This action returns a #${userId}`]);
        // throw new HttpException({ status: HttpStatus.FORBIDDEN, error: '我是 403 哇哈哈哈哈' }, HttpStatus.FORBIDDEN);
        throw new ForbiddenException('我是 403 哇哈哈哈哈');
    }

    // @Post('findOne')
    // @ApiImplicitParam({ name: 'userId', enum: [111, 222, 333, 444, 555, 666] })
    // async findOne(@Body() addUserDto: AddUserDto) {
    //     // return this.userService.findOne(addUserDto.userName);
    //     return this.authService.validateUser(addUserDto.userName, '1234');
    // }
}
