typedef struct {
  unsigned long P[16 + 2];
  unsigned long S[4][256];
} _CTX;

void _Init(_CTX *ctx, unsigned char *key, int keyLen);
void _Encrypt(_CTX *ctx, unsigned long *xl, unsigned long *xr);
void _Decrypt(_CTX *ctx, unsigned long *xl, unsigned long *xr);
