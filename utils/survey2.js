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
          "content": "\u003Ch1\u003EYou are almost done!\u003C\u002Fh1\u003E\n\u003Cp\u003EFinally, we would like you to give us a few of your thoughts about the monster families. Please take your time and respond to the items below as truthfully as possible.\u003C\u002Fp\u003E\n\n\n",
          "name": ""
        },
        {
          "required": true,
          "type": "divider"
        },
        {
          "required": true,
          "type": "likert",
          "items": [
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f1.png']}\"\u003E",
              "coding": "1"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f2.png']}\"\u003E",
              "coding": "2"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f3.png']}\"\u003E",
              "coding": "3"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f4.png']}\"\u003E",
              "coding": "4"
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
          "label": "1. Rate each monster family based on how much you were interested in discovering what they preferred eating:",
          "help": "\u003Cp\u003E1 = Less interested\u003Cbr\u003E10 = More interested\u003C\u002Fp\u003E",
          "name": "int"
        },
        {
          "required": true,
          "type": "divider"
        },
        {
          "required": true,
          "type": "likert",
          "items": [
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f1.png']}\"\u003E"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f2.png']}\"\u003E",
              "coding": "2"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f3.png']}\"\u003E",
              "coding": "3"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f4.png']}\"\u003E",
              "coding": "4"
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
          "label": "2. Rate each monster family based on how complex you thought they were:",
          "help": "\u003Cp\u003E1 = Less complex\u003Cbr\u003E10 = More complex\u003C\u002Fp\u003E",
          "name": "comp"
        },
        {
          "required": true,
          "type": "divider"
        },
        {
          "required": true,
          "type": "likert",
          "items": [
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f1.png']}\"\u003E",
              "coding": "1"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f2.png']}\"\u003E",
              "coding": "2"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f3.png']}\"\u003E",
              "coding": "3"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f4.png']}\"\u003E",
              "coding": "4"
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
          "label": "3. Rate each monster family based on how much time you spent on them:",
          "name": "time",
          "help": "\u003Cp\u003E1 = Less time\u003Cbr\u003E10 = More time\u003C\u002Fp\u003E"
        },
        {
          "required": true,
          "type": "divider"
        },
        {
          "required": true,
          "type": "likert",
          "items": [
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f1.png']}\"\u003E",
              "coding": "1"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f2.png']}\"\u003E",
              "coding": "2"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f3.png']}\"\u003E",
              "coding": "3"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f4.png']}\"\u003E",
              "coding": "4"
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
          "label": "4. Rate each monster family based on how much progress you felt you made for learning their food preferences:",
          "help": "\u003Cp\u003E1 = Less progress\u003Cbr\u003E10 = More progress\u003C\u002Fp\u003E",
          "name": "prog",
          "shuffle": false
        },
        {
          "required": true,
          "type": "divider"
        },
        {
          "required": true,
          "type": "likert",
          "items": [
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f1.png']}\"\u003E",
              "coding": "1"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f2.png']}\"\u003E",
              "coding": "2"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f3.png']}\"\u003E",
              "coding": "3"
            },
            {
              "label": "\u003Cimg class=\"thumbnail\" src=\"${this.files['f4.png']}\"\u003E",
              "coding": "4"
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
          "name": "\u003Cp\u003E1 = Less progress\u003Cbr\u003E10 = More progress\u003C\u002Fp\u003E",
          "help": "\u003Cp\u003E1 = Definitely no rule\u003Cbr\u003E10 = Definitely a rule\u003C\u002Fp\u003E",
          "label": "5. Rate each monster family based on how likely you think it had a rule for food preferences:"
        },
        {
          "required": true,
          "type": "divider"
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
          "help": "\u003Cp\u003E1 = Definitely could \u003Cb\u003ENOT\u003C\u002Fb\u003E learn more\u003Cbr\u003E10 = Definitely \u003Cb\u003ECOULD\u003C\u002Fb\u003E learn more\u003C\u002Fp\u003E",
          "label": "6. Rate each monster family based on how much you think you could learn if you had more time to play with it:",
          "name": "lrn1"
        },
        {
          "required": true,
          "type": "divider"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Submit",
      "submitButtonPosition": "right",
      "files": {
        "f1.png": "assets/stimuli/monsters-preview/f1.png",
        "f2.png": "assets/stimuli/monsters-preview/f2.png",
        "f3.png": "assets/stimuli/monsters-preview/f3.png",
        "f4.png": "assets/stimuli/monsters-preview/f4.png"
      },
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Post play",
      "width": "l"
    }
  ]
})

// Let's go!
jatos.onLoad(() => study.run())