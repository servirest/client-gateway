import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT : number
  MENU_MICROSERVICE_HOST : string
  MENU_MICROSERVICE_PORT : number
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  MENU_MICROSERVICE_HOST : joi.string().required(),
  MENU_MICROSERVICE_PORT : joi.number().required(),
})
.unknown(true)

const {error, value} = envsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
  port:envVars.PORT,
  menuMicroservice: {
    host: envVars.MENU_MICROSERVICE_HOST,
    port: envVars.MENU_MICROSERVICE_PORT,
  }
}