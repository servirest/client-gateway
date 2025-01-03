import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsStartBeforeEnd(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStartBeforeEnd',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Obtenemos las propiedades 'start_time' y 'end_time' del objeto
          const object = args.object as any;
          const startTime = object.start_time;
          const endTime = object.end_time;

          // Comparamos las horas solo si ambas están presentes
          if (startTime && endTime) {
            const start = startTime.split(':').map(Number);
            const end = endTime.split(':').map(Number);

            // Convertimos las horas a minutos para compararlas fácilmente
            const startMinutes = start[0] * 60 + start[1];
            const endMinutes = end[0] * 60 + end[1];

            // Validamos si la hora de inicio es menor o igual a la de fin
            return startMinutes <= endMinutes;
          }
          return true; // Si no hay horas, no se valida (se deja pasar)
        },
        defaultMessage(args: ValidationArguments) {
          return `La hora de inicio no puede ser mayor que la hora de fin.`;
        },
      },
    });
  };
}
