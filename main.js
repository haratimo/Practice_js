import * as jsPsychModule from "../jsPsych/jspsych.js";

// Define stimulus array
let stimuli = [];

// Load CSV file
jsPsychModule.pluginAPI.loadCSV("stimuli.csv", function(data){
  stimuli = data.map(function(row){
    return row.stimulus;
  });
});

// Shuffle stimuli and divide into sets of four
const shuffledStimuli = jsPsychModule.randomization.shuffle(stimuli);
const stimulusSets = jsPsychModule.utils.chunkArray(shuffledStimuli, 4);

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
    jsPsychModule.pluginAPI.clearAllTimeouts();
  },
  on_finish: function (data) {
    console.log(data);
  },
};

// Welcome trial
const welcomeTrial = {
  type: "html-keyboard-response",
  stimulus: "<p>Welcome to the experiment!</p><p>Press any key to begin.</p>",
  post_trial_gap: 1000,
};

// Experiment timeline
const timeline = [welcomeTrial, maxDiffTrial];

// Run experiment
jsPsychModule.init({
  timeline: timeline,
});
