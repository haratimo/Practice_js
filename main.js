// Read CSV file and define stimulus array
const stimuli = [];
$.ajax({
  url: "../stimuli.csv",
  async: false,
  success: function (csvd) {
    const rows = Papa.parse(csvd).data;
    for (let i = 0; i < rows.length; i++) {
      stimuli.push(rows[i][0]);
    }
  },
});

// Shuffle stimuli and divide into sets of four
const shuffledStimuli = jsPsych.randomization.shuffle(stimuli);
const stimulusSets = jsPsych.utils.chunkArray(shuffledStimuli, 4);

// Define maxdiff plugin trial
const maxDiffTrial = {
  type: "maxdiff",
  prompt: "<p>Choose the best and worst metaphor:</p>",
  labels: ["Best", "Worst"],
  options: stimulusSets,
  repetitions: 8,
  require_selection: [1, 1],
  button_html: '<button class="maxdiff-option jspsych-btn">%choice%</button>',
  response_ends_trial: true,
  on_load: function () {
    jsPsych.pluginAPI.clearAllTimeouts();
  },
  on_finish: function (data) {
    console.log(data);
  },
};

// Welcome
