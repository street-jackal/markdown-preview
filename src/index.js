import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import marked from 'marked';
import reportWebVitals from './reportWebVitals';

const placeholderText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

const outputName = 'Text With Markdown Formatting Applied';
const inputName = 'Raw Text With Markdown';
const renderer = new marked.Renderer();

marked.setOptions({
  breaks: true,
  gfm: true
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: placeholderText
    };
    this.updateText = this.updateText.bind(this);
  }

  updateText(e) {
    this.setState(
      { content: e.target.value }
    );
  }

  render() {
    return (
      <div>
        <Original
          onChange={this.updateText}
          content={this.state.content}
        />
        <Formatted content={this.state.content} />
      </div>
    )
  }

}

const Original = props => {
  return (
    <div>
      <h1 id="editorHeading"><b>{inputName}</b></h1>
      <textarea
        id='editor'
        onChange={props.onChange}
        type='text'
        value={props.content}
        autofocus="autofocus"
        label="input text"
      />
    </div>
  );
};

const Formatted = props => {
  return (
    <div>
      <h1 id="previewHeading"><b>{outputName}</b></h1>
      <p
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(props.content)
        }}
      />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
