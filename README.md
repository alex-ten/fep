# Free Exploration Paradigm with JATOS

Implementing the original Free Exploration Paradigm instance to run with [JATOS v3.7.4](https://github.com/JATOS/JATOS/releases/tag/v3.7.4). Task description can be found in the [paper](https://www.nature.com/articles/s41467-021-26196-w) and on [OSF](https://osf.io/k2yur/).

To run in JATOS do the following:
1. Follow the [installation instructions](https://www.jatos.org/Installation.html) to install JATOS v3.7.4 on your operating system.
2. Start JATOS and open the GUI (see [this tutorial](https://www.jatos.org/Get-started.html) for more information).
3. Import `free_free_exploration_paradigm.jzip` file into JATOS (see [this page](https://www.jatos.org/Deploy-to-a-server-installation.html) for details).
4. In your JATOS `conf/production.conf`, set the study assets root path to the parent directory of this repository (note, the repositary must be named 'fep').
5. Now, although you've importend the study in the .jzip file, JATOS will be serving contents of the repository.

> :warning: Note, if the .jzip file is not one of the latest-change files, the code for the experiment (e.g., in components, styles, or utils) is probably ahead of the exported version un the .jzip.

If you have questions, contact Alex Ten at alexandr.ten@uni-tuebingen.de

# Working with Labjs
1. Export labjs study as JATOS study
2. Put the lib, styles, and index.html where you need it in your JATOS study assets directory
3. Edit the index html file to correctly refer to lib and script files.
4. To start next component (or show outro), edit the line that saves data to JATOS, e.g., `jatos.submitResultData(resultJson, nextTrialOrStage(true));`
