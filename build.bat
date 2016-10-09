@echo off

echo Location FlexSearch Core
echo Folder 'FlexSearch' should be present in the same parent folder as the current repository
cd..
cd flexsearch

call build.bat website
cd ..
cd documentation

echo Copying the generated api.html file
copy ..\flexsearch\deploy\clients\html\api.html docs\_includes\api.html

echo Copying the generated examples
if not exist "docs\_data\dynamic" mkdir "docs\_data\dynamic"
copy ..\flexsearch\documentation\docs\data\*.* docs\_data\dynamic\

echo Copying swagger spec
copy ..\flexsearch\spec\swagger-full.json docs\_data\dynamic\swagger.json
C:\git\Catalogue\src\Catalogue\bin\Debug\Catalogue.exe --docs docs --conf release
