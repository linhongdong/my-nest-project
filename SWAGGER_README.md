## swagger 文档说明

#### @ApiUseTags(...tags)。
```
将控制器附加到指定的标签，我们需要使用 @ApiUseTags(...tags) 装饰器
```

#### @ApiModelProperty({...}) 
```
@ApiModelProperty：用在属性上，对属性做注释

参数说明
{
  description?: string;
  required?: boolean;           // 是否必填
  type?: any;                   // 类型  数组：[string]
  isArray?: boolean;            // 是否数组
  collectionFormat?: string;
  default?: any;
  enum?: SwaggerEnumType;
  format?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  readOnly?: boolean;
  xml?: any;
  example?: any;               // 举例说明
}
```

#### @ApiResponse() 
```
要定义自定义HTTP响应，我们使用@ApiResponse()装饰器。
@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
```

#### 
```

```

#### 
```

```

#### 
```

```

#### 
```

```

#### 
```

```
