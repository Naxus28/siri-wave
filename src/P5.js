import React from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import SiriWaveVisualizer from './SiriWaveVisualizer';

// https://p5js.org/reference/#/p5.AudioIn
class P5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { micLevel: 0 };
  }

  componentDidMount() {
    this.setup();
    this.rafId = requestAnimationFrame(this.draw);
  }

  setup = () => {
    this.mic = new p5.AudioIn();
    this.mic.start();
  };

  draw = () => {
    this.micLevel = this.mic.getLevel(.5);
    this.setState({ micLevel: this.micLevel });
    this.rafId = requestAnimationFrame(this.draw);
  };

  componentWillUnmount(){
    cancelAnimationFrame(this.rafId);
  }
  
  render() {
    return <SiriWaveVisualizer audioData={this.state.micLevel} />;
  }
}

export default P5;
