import { HttpParams } from '@angular/common/http';

export class Utility {
  public static convertModelToFormData(model: any, form: FormData | null = null, namespace = ''): FormData {
    let formData = form || new FormData();

    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;

      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;

      if (model[propertyName] instanceof Date) {
        formData.append(formKey, model[propertyName].toISOString());
      } else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element: any, index: number) => {
          const tempFormKey = `${formKey}[${index}]`;
          if (element instanceof Array) {
            this.convertModelToFormData(element, formData, tempFormKey);
          } else {
            formData.append(tempFormKey, element);
          }
        });
      } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
        this.convertModelToFormData(model[propertyName], formData, formKey);
      } else if (model[propertyName] instanceof File) {
        formData.append(formKey, model[propertyName]);
      } else {
        formData.append(formKey, model[propertyName].toString());
      }
    }

    return formData;
  }
}
export function convertModelToHttpParams(model: any): HttpParams {
  let params = new HttpParams();

  Object.entries(model).forEach(([k, v]) => {
    if (v != null) params = params.append(k, model[k]);
  });
  return params;
}
