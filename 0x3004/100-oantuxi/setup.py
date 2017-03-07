from distutils.core import setup
from Cython.Build import cythonize

setup(
    name = "oantuxi",
    ext_modules = cythonize('oantuxi.pyx'), # accepts a glob pattern
)