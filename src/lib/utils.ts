type ClassValue = string | number | boolean | undefined | null;
type ClassObject = {[key: string]: any;};
type ClassArray = ClassValue[];
type ClassInput = ClassValue | ClassObject | ClassArray;
export function cn(...inputs: ClassInput[]): string {
  const classes = inputs.filter(Boolean);
  return classes.join(' ');
}