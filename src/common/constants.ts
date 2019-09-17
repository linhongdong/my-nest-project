export default class Constants {
    // jwt 秘钥 (警告 不要公开公开此密钥。 我们这里已经这样做，以明确代码正在做什么，但在生产系统中，您必须使用适当的措施保护此密钥，例如秘密保险库，环境变量或配置服务）。
    public static readonly jwtSecret: string = 'secretKey';

    // jwt 有效期
    public static readonly jwtExpiresIn: string = '600s';
}
// export const jwtConstants: object = {
//     secret: 'secretKey',
// };
