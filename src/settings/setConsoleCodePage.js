const os = require('os');

if (process.env.NODE_ENV !== 'production') {
  const ffi = require('ffi-napi');

  if (os.platform() === 'win32') {
    const kernel = ffi.Library('Kernel32', {
      'SetConsoleOutputCP': [ffi.types.bool, [ffi.types.uint]],
      'SetConsoleCP': [ffi.types.bool, [ffi.types.uint]],
    });

    const CP_UTF8 = 65001;

    kernel.SetConsoleOutputCP(CP_UTF8);
    kernel.SetConsoleCP(CP_UTF8);
  }
}