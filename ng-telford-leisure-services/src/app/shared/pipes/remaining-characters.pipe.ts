import { Pipe } from '@angular/core';

@Pipe({
  name: 'remainingCharacters'
})
export class RemainingCharactersPipe {
  transform(value: string, maxLength: number): string {
    const remaining = maxLength - (value?.length || 0);
    const characterCount = Math.abs(remaining);
    return `${characterCount} character${characterCount === 1 ? '' : 's'}`;
  }
}
