import { Pipe, PipeTransform } from '@angular/core';
import { ArticleCategoryTypeEnum } from '../../modules/features/article/article-category/models/model/article-category.model';

@Pipe({
  name: 'article',
  standalone: true,
})
export class ArticlePipe implements PipeTransform {
  transform(ArticlesEnum: ArticleCategoryTypeEnum): string {
    switch (ArticlesEnum) {
      case ArticleCategoryTypeEnum.Exercise:
        return 'article.Exercise';
      case ArticleCategoryTypeEnum.General:
        return 'article.General';
      case ArticleCategoryTypeEnum.Nutrition:
        return 'article.Nutrition';
      default:
        return 'Unknown Article Type';
    }
  }
}
