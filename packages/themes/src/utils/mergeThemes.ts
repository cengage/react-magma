// import { ThemeInterface } from '../ThemeInterface';
import { v3 as magma } from '../magma';
// import { ThemeInterface } from '../ThemeInterface';

export const mergeThemes = (obj1:any, obj2:any=magma) => {
  const keys = Object.keys(obj2)
  let nextObj = { ...obj1 }

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const value = obj2[key]
    if (typeof value === "object" && value !== null) {
      nextObj = { ...nextObj, ...mergeThemes(nextObj, value) }
    } else {
      nextObj = { ...nextObj, [key]: value }
    }
  }

  return nextObj
}