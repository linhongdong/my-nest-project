export default class Config {
    // 项目端口号
    static readonly PORT: string = 'secretKey';
    // 代理目标地址
    static readonly TARGET: string = '600s';

    // jwt 秘钥 (警告 不要公开公开此密钥。 我们这里已经这样做，以明确代码正在做什么，但在生产系统中，您必须使用适当的措施保护此密钥，例如秘密保险库，环境变量或配置服务）。
    static readonly jwtSecret: string = 'secretKey';
    // jwt 有效期
    static readonly jwtExpiresIn: string = '600s';
    // mysql host
    static readonly MYSQL_HOST: string = 'localhost';
    // mysql port
    static readonly MYSQL_PORT: number = 3306;
    // mysql 用户名
    static readonly MYSQL_USERNAME: string = 'root';
    // mysql 密码
    static readonly MYSQL_PASSWORD: string = '573532';
    // mysql 数据库名称
    static readonly MYSQL_DATABASE: string = 'my_nest';
    // mysql 数据库表前缀
    static readonly MYSQL_ENTITYPREFIX: string = 'mn_';
    // mysql 指示是否启用日志记录。
    //
    static readonly MYSQL_LOGGING: boolean = true;
    // 指示是否应在每次启动应用程序时自动创建数据库架构。
    static readonly MYSQL_SYNCHRONIZE: boolean = true;
    /**
     * 连接 mysql 数据库配置信息
     * type 数据库类型
     * host 地址  >>> localhost   127.0.0.1 <<<
     * port 端口号
     * username 用户名
     * password 密码
     * database 数据库名称
     * logging 指示是否启用日志记录（如果设置为true，则将启用查询和错误日志记录。 您还可以指定要启用的不同类型的日志记录，例如[“query”，“error”，“schema”]。 详细了解日志记录）
     * entityPrefix 数据库表前缀
     * entities 实体类，对应的数据库中的每个表
     * synchronize 指示是否应在每次启动应用程序时自动创建数据库架构（请注意此选项，不要在生产中使用它 - 否则您可能会丢失生产数据。 此选项在调试和开发期间非常有用。 作为替代方案，您可以使用CLI并运行schema：sync命令）
     * charset 设置数据库字符集，基本没用，应该在数据库创建的时候设置字符集
     */
    static readonly MYSQL_OPTIONS: any = {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '573532',
        database: 'my_nest',
        logging: true,
        entityPrefix: 'mn_',
        synchronize: true,
    };
}
