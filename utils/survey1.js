// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "messageHandlers": {
    "epilogue": function anonymous(
) {
var resultJson = study.options.datastore.exportJson();
jatos.submitResultData(resultJson, nextTrialOrStage(true));
}
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.html.Page",
      "items": [
        {
          "required": true,
          "type": "html",
          "content": "\u003Ch1\u003EGreat!\u003C\u002Fh1\u003E\n\u003Cp\u003ENow that you have had a chance to interact with monsters from different families we would like you to reflect on your experience.\u003C\u002Fp\u003E\n\n\n",
          "name": ""
        },
        {
          "required": true,
          "type": "likert",
          "items": [
            {
              "coding": "1",
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f1.png']}\"\u003E"
            },
            {
              "coding": "2",
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f2.png']}\"\u003E"
            },
            {
              "coding": "3",
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f3.png']}\"\u003E"
            },
            {
              "coding": "4",
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f4.png']}\"\u003E"
            }
          ],
          "width": "10",
          "anchors": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
          ],
          "shuffle": true,
          "help": "\u003Cp\u003E1 = Definitely can \u003Cb\u003ENOT\u003C\u002Fb\u003E learn more\u003Cbr\u003E10 = Definitely \u003Cb\u003ECAN\u003C\u002Fb\u003E learn more\u003C\u002Fp\u003E",
          "label": "Please rate each monster family based on how much you think you can learn about its food preferences during the rest of the task.",
          "name": "lrn1"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue",
      "submitButtonPosition": "right",
      "files": {
        "f1.png": "assets/stimuli/monsters-preview/f1.png",
        "f2.png": "assets/stimuli/monsters-preview/f2.png",
        "f3.png": "assets/stimuli/monsters-preview/f3.png",
        "f4.png": "assets/stimuli/monsters-preview/f4.png"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "end": function anonymous(
) {

}
      },
      "title": "Learnability 1",
      "width": "l"
    }
  ]
})

// Let's go!
jatos.onLoad(() => study.run())