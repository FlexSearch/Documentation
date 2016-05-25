@echo off

echo Location FlexSearch Core
echo Folder 'FlexSearch' should be present in the same parent folder as the current repository
cd..
cd flexsearch

call build.bat api
call build.bat target=RestorePackages
call build.bat target=BuildApp
call build.bat target=HttpTests
cd ..
cd documentation

echo Copying the generated api.html file
copy ..\flexsearch\documentation\api.html docs\_includes\api.html

echo Copying the generated examples
if not exist "docs\_data\dynamic" mkdir "docs\_data\dynamic"
copy ..\flexsearch\documentation\docs\data\*.* docs\_data\dynamic\

echo Copying swagger spec
copy ..\flexsearch\spec\swagger-full.json docs\_data\dynamic\swagger.json
catalogue --docs docs --conf prod
