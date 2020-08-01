
export class ColorHelper {
  static primary = '#007bff';
  static danger = '#dc3545';
  
  static whiteIlluminance = 1;
  
  // Supports : #ffffff, rgb(0,0,0)
	static tryGetRGB(color: string) {
		const hexArr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
		if (hexArr !== null)
			return {
				r: parseInt(hexArr[1], 16),
				g: parseInt(hexArr[2], 16),
				b: parseInt(hexArr[3], 16),
      };
      
    // PROBLEM: transparent element is unreliable for getting contrast
    // const rgbaArr = /rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3})[ .,\d]*\)/i.exec(color);

		const rgbArr = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/i.exec(color);
		if (rgbArr !== null)
			return {
				r: parseInt(rgbArr[1], 10),
				g: parseInt(rgbArr[2], 10),
				b: parseInt(rgbArr[3], 10),
			};

		throw new Error('Passed color is not understandable: ' + color);
  }
  
  //#region Copied from stack overflow
	static getIlluminance(color) {
    const { r, g, b } = this.tryGetRGB(color);
		const a = [r, g, b].map((v) => {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	}

	static hexContrastToWhite(hexColor) {
		return this.whiteIlluminance / this.getIlluminance(hexColor);
	}

	static isHexContrastToWhite(hexColor) {
		return this.hexContrastToWhite(hexColor) > 4.5;
  }
  //#endregion
}
