import { FormControl, FormRecord } from "@angular/forms";
import { Characteristic } from "./map";

export type ColorRecord = FormRecord<FormControl<string>>;
export type PaletteForm = Record<Characteristic, ColorRecord>;
export type Palette = Record<Characteristic, Record<string, string>>;
