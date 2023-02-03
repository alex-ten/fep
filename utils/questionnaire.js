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
jatos.submitResultData(resultJson, jatos.startNextComponent);
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
          "type": "likert",
          "items": [
            {
              "label": "I view challenging situations as an opportunity to learn",
              "coding": "je1"
            },
            {
              "label": "I seek out situations where it is likely that I will have to think in depth about something.",
              "coding": "je2"
            },
            {
              "label": "I enjoy learning about subjects that are unfamiliar to me.",
              "coding": "je3"
            },
            {
              "label": "I find it fascinating to learn new information.",
              "coding": "je4"
            }
          ],
          "width": "7",
          "anchors": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7"
          ],
          "label": "Below are statements people often use to describe themselves. Please use the scale below to indicate the degree to which these statements accurately describe you. There are no right or wrong answers. 1 – Does not describe me at all  2 – Barely describes me  3 – Somewhat describes me  4 – Neutral 5 – Generally describes me  6 – Mostly describes me 7 – Completely describes me",
          "name": "5DCS"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Joyous Exploration",
      "width": "l"
    }
  ]
})

// Let's go!
jatos.onLoad(() => study.run())