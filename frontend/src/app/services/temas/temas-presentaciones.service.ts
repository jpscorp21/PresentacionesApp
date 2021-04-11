import { Injectable } from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TemasPresentacionesService {

  private readonly _THEMES: any = {
    AEMELIA: {
      name: 'AEMELIA',
      id: '18Lmd-YFhVWj785_xddyt_EueVrC2L-u2Lg4OshzMYpM',
      text_length_max: 261
    },
    FIDELE: {
      name: 'FIDELE',
      id: '19hK0nsGFA25jRWODgItHPUbkSLVzZJ7h4sx18S_ruqI', // LINDO
      text_length_max: 516
    },
    MACMORRIS: {
      name: 'MACMORRIS',
      id: '1wU4PGntIM205f74wnp4WP5ZIxAUBHOyLsLmjv8pjI-w',
      text_length_max: 241
    },
    LAERTES: {
      name: 'LAERTES',
      id: '1Mw57nN7Q_y3fkm34Pew0i30E3NfKcgcTXC7nUkpY0Co',
      text_length_max: 362
    },
    OBERON: {
      name: 'OBERON',
      id: '1hv-aeaaOIUg3R4_lBE6owWmqpe0MwA62cWmPFhxuQEo',
      text_length_max: 362
    },
    SALERIO: {
      name: 'SALERIO',
      id: '1fy6ayeSw5FIb8Wx23yZsf8YzU5XNOjyJpKYRol5apts',
      text_length_max: 268
    },
    BASSET: {
      name: 'BASSET',
      id: '1mdfubo8wTKSRXd_YAOKaKy3g9KxmdtOZTLTOlZcxlnk', // LINDO
      text_length_max: 351
    },
    WOLSEY: {
      name: 'WOLSEY',
      id: '1iLL9PZzUV882ZwYa71pa0wsDmc0lfFDUyBpHr76gU3o',
      text_length_max: 356
    },
    RODERIGO: {
      name: 'RODERIGO',
      id: '1QxITSMBNMKqD2d2Jr9y69K0WpS70zdVvytJCy6pjExM',
      text_length_max: 275
    }
  };

  get THEMES(): any[] {
    return Object.values(this._THEMES);
  }

  getLengthMax(theme: string) {
    return this._THEMES[theme].text_length_max;
  }
}

