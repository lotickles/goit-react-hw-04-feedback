import React, { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };
  // display the total number of collected reviews from all categories
  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    // if total is greater than 0, return the positive percentage, else 0
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  const handleClick = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const { good, neutral, bad } = feedback;
  const total = countTotalFeedback();
  const options = ['good', 'neutral', 'bad'];
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className="container">
      <Section title="Please leave feedback">
        {/*create a dom to FeedbackOptions*/}

        <FeedbackOptions options={options} onLeaveFeedback={handleClick} />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
