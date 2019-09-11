import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
    // return req.body;
    // return data ? req.body && req.body[data] : req.body;
    return req.body && req.body[data];
});
