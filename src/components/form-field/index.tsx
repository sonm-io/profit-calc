import * as React from 'react';
import * as cn from 'classnames';
import './index.css';

export interface IFormFieldCssClasses {
  root: string;
  label: string;
  input: string;
  help: string;
}

interface IFormFieldProps {
  className?: string;
  cssClasses?: IFormFieldCssClasses;
  warning?: string | string[];
  error?: string | string[];
  info?: string | string[];
  success?: string | string[];
  children: any;
  label?: string;
  fullWidth?: boolean;
  horizontal?: boolean;
  postfix?: string;
}

const helpTextTypes: Array<keyof IFormFieldProps> = ['error', 'info', 'success'];

export class FormField extends React.PureComponent<IFormFieldProps, any> {
  
  public static defaultCssClasses: IFormFieldCssClasses = {
    root: 'form-field',
    label: 'form-field__label',
    input: 'form-field__input',
    help: 'form-field__help'
  }

  public render() {
    // console.log('render FormField');
    const p = this.props;
    const cssClasses = p.cssClasses || FormField.defaultCssClasses
    const root = cssClasses.root;
    let helpText = '';
    let helpTextType = '';

    helpTextTypes.some(x => {
      const raw = p[x];

      if (raw && raw.length) {
        helpText = Array.isArray(raw) ? raw.join('; ') : raw;
        helpTextType = x;
      }

      return Boolean(helpTextType);
    });

    let label;

    if (p.label) {
      label = p.label.trim();
      if (!label.endsWith(':') && p.horizontal !== true) {
        label += ':';
      }
    }

    const postfix = p.postfix ? <div className="form-field__postfix">{p.postfix}</div> : null;

    return (
      <label
        className={cn(root, p.className, {
          [`${root}--${helpTextType}`]: helpTextType,
          [`${root}--full-width`]: p.fullWidth,
          [`${root}--horizontal`]: p.horizontal,
        })}
        onClick={this.handleClick}
      >
        <div
          className={cn(cssClasses.label, {
            [`${cssClasses.label}--nowrap`]: p.horizontal !== true,
          })}
        >
          {label ? label : ''}
        </div>
        <div className={cssClasses.input} ref={this.saveInputContainerRef}>
          {p.children}
          {postfix}
          <div className={cssClasses.help}>{helpText}</div>
        </div>
      </label>
    );
  }

    
  protected inputContainerRef?: HTMLElement;

  protected handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  protected saveInputContainerRef = (ref: HTMLDivElement) => {
    this.inputContainerRef = ref;
  };
}

export default FormField;
