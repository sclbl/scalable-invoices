# scalable-module-boilerplate

A starting point for Scalable modules. Includes the module base, skeleton and fontawesome.

* [Included Packages](#included-packages)
* [Installation](#installation)

## <a name="included-packages"></a> Included Packages

* [sclbl:module-base](https://github.com/sclbl/module-base/)
* [skeleton:skeleton](https://github.com/pmuens/skeleton/)
* [fortawesome:fontawesome](https://github.com/MeteorPackaging/Font-Awesome/)

## <a name="installation"></a> Installation

1. Clone this repo to `<your_module>`

  `git clone https://github.com/Sclbl/scalable-module-boilerplate.git <your_module>`

2. Remove `.git`

  `cd <your_module> && rm -rf .git`

3. Update `settings.json`

  Replace `<Module Name>` and `<Developer Name>` with your data.

4. Start coding!

# README for your module
Add a description for your module.

## Basic Usage
Just fill out the variables in the settings.json file.
Then run the application on a free port (The Scalable system should already be running):

e.g. `meteor --settings settings.json --port 4000`

The module will automatically register itself and should be visible seconds after that.
