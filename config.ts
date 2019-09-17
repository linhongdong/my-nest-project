export default class Constants {
    // 项目端口号
    public static readonly PORT: string = 'secretKey';
    // 代理目标地址
    public static readonly TARGET: string = '600s';
    // mysql 用户名
    public static readonly MYSQL_USERNAME: string = 'root';
    // mysql 密码
    public static readonly MYSQL_PASSWORD: string = '573532';
    // mysql 数据库名称
    public static readonly MYSQL_DATABASE: string = 'my_nest';
    // mysql 数据库表前缀
    public static readonly MYSQL_ENTITYPREFIX: string = 'mn_';
    // mysql 指示是否启用日志记录。
    // 如果设置为true，则将启用查询和错误日志记录。 您还可以指定要启用的不同类型的日志记录，例如[“query”，“error”，“schema”]。 详细了解日志记录。
    public static readonly MYSQL_LOGGING: boolean = true;
    // 指示是否应在每次启动应用程序时自动创建数据库架构。
    // 请注意此选项，不要在生产中使用它 - 否则您可能会丢失生产数据。 此选项在调试和开发期间非常有用。 作为替代方案，您可以使用CLI并运行schema：sync命令。 请注意，对于MongoDB数据库，它不会创建模式，因为MongoDB是无模式的。 相反，它只是通过创建索引来同步。
    public static readonly MYSQL_SYNCHRONIZE: boolean = true;
}
