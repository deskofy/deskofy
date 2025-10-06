import Ajv, { ErrorObject } from 'ajv';

import { CONFIG_SCHEMA, TDeskofyConfigSchema } from './schema';

type TValidateConfigSchemaResponse = {
  isOk: boolean;
  config: TDeskofyConfigSchema | undefined;
  error: string[] | null | undefined;
};

const formatErrors = (errors: ErrorObject[] | null | undefined): string[] => {
  if (!errors) {
    return [];
  }

  return errors.map((err) => {
    const path = err.instancePath ? err.instancePath : 'root';
    const message = err.message || 'invalid value';
    const params = JSON.stringify(err.params);
    return `${path} ${message} (params: ${params})`;
  });
};

const validateConfigSchema = (
  config: unknown,
): TValidateConfigSchemaResponse => {
  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
  });

  const validate = ajv.compile<TDeskofyConfigSchema>(CONFIG_SCHEMA);
  if (!validate(config)) {
    return {
      isOk: false,
      config: undefined,
      error: formatErrors(validate.errors),
    };
  }

  return {
    isOk: true,
    config: config,
    error: undefined,
  };
};

export { validateConfigSchema };
