import { GlobalStyle } from 'GlobalStyle';
import { Layout } from 'Layuot';
import { useState } from 'react';
import { FeedbackOptions } from './Buttons/Buttons';
import { NoFeetback } from './NoFeetback/NoFeetback';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = feedbackType => {
    if (feedbackType === 'good') {
      setGood(good + 1);
    } else if (feedbackType === 'neutral') {
      setNeutral(neutral + 1);
    } else if (feedbackType === 'bad') {
      setBad(bad + 1);
    }
  };

  const calculateTotal = () => {
    return good + neutral + bad;
  };

  const calculatePositivePercentage = () => {
    const total = calculateTotal();
    return total > 0 ? ((good / total) * 100).toFixed(2) : 0;
  };

  const calculateNoFeedback = () => {
    return good === 0 && neutral === 0 && bad === 0;
  };

  const total = calculateTotal();
  const positivePercentage = calculatePositivePercentage();
  const noFeedback = calculateNoFeedback();

  return (
    <Layout>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      <Section title="Statistics">
        {noFeedback ? (
          <NoFeetback title="No ffetback given!" />
        ) : (
          <Statistics
            options={{ good, neutral, bad }}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>

      <GlobalStyle />
    </Layout>
  );
};
