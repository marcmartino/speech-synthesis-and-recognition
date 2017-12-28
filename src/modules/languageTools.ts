function removeAccents(str: string): string {
  var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  var split = str.toLowerCase().split('');
  var strLen = split.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(split[i])) != -1) {
      split[i] = accentsOut[x];
    }
  }
  return split.join('');
}

export { removeAccents };