import * as jsPsychModule from "https://unpkg.com/jspsych@7.3.1/jspsych.js";

const timeline = [];

const welcomeTrial = {
  type: "html-keyboard-response",
  stimulus: "<p>Welcome to the experiment!</p><p>Press any key to begin.</p>",
  post_trial_gap: 1000
};

const instructionsTrial = {
  type: "html-keyboard-response",
  stimulus: "<p>Instructions:</p><p>In this experiment, you will be presented with a series of pairs of metaphors. For each pair, you will be asked to choose the one that is best and the one that is worst. Please try to make your choices based on your gut feeling, rather than thinking too hard about it. </p><p>Press any key to begin.</p>",
  post_trial_gap: 1000
};

const stimuli = [
  "The snow was a white blanket",
  "He had a voice as loud as a lion",
  "The dancer was a graceful swan",
  "She was a cheetah on the track",
  "The sun was a ball of fire",
  "The computer was an old dinosaur",
  "The wind was a howling wolf",
  "His words were music to my ears",
  "The leaves were dancers in the wind",
  "The engine was a pounding heart",
  "The waves were soldiers marching to shore",
  "The coffee was a warm blanket",
  "Her eyes were gleaming diamonds",
  "The tree was a tower touching the sky",
  "The river was a snake slithering through the valley",
  "The night was a black velvet cloak"
];

const shuffledStimuli = jsPsych.randomization.shuffle(stimuli);
const stimulusSets = jsPsych.utils.chunkArray(shuffledStimuli, 2);

for (let i = 0; i < stimulusSets.length; i++) {
  const maxDiffTrial = {
    type: "maxdiff",
    prompt: "<p>Choose the best and worst metaphor:</p>",
    labels: ["Best", "Worst"],
    options: stimulusSets[i],
    require_selection: [1, 1],
    button_html: '<button class="maxdiff-option jspsych-btn">%choice%</button>',
    response_ends_trial: true
  };

  timeline.push(maxDiffTrial);
}

const debriefTrial = {
  type: "html-keyboard-response",
  stimulus: "<p>Thank you for participating in this experiment!</p><p>Press any key to exit.</p>",
  post_trial_gap: 1000
};

timeline.unshift(debriefTrial);
timeline.unshift(instructionsTrial);
timeline.unshift(welcomeTrial);

jsPsych.init({
  timeline: timeline,
  show_progress_bar: true,
  plugins: {
    fullscreen: {
      showtext: true,
      buttontext: "Go Fullscreen",
      exittext: "Exit Fullscreen"
    }
  }
});
