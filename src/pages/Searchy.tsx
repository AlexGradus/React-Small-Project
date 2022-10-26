import React, { Component } from 'react';

class Searchy extends Component {
  state = {
    firstInput: '',
    firstInputMistake: '',
    disabled: true,
    regstr: /^[a-zA-Zа-яА-ЯёЁ]+$/,
    secondInput: '2012-11-22',
    value: 'minsk',
    agree: true,
    agree2: false,
    agree3: true,
    files: null,
    resFull: '',
    ydaloi: 'Не удалой',
    young: 'Молодой',
    handsome: 'Красавчик',
    Arr: [
      {
        firstInput: '',
        firstInputMistake: '',
        disabled: true,
        regstr: /^[a-zA-Zа-яА-ЯёЁ]+$/,
        secondInput: '',
        value: '',
        agree: true,
        agree2: false,
        agree3: true,
        files: null,
        resFull: '',
        ydaloi: '',
        young: '',
        handsome: '',
      },
    ],
  };
  Datas = 'Данные';
  solveFirstInput(event: { preventDefault: () => void }) {
    event.preventDefault();
    console.log(this.state.firstInput.length);
    if (this.state.firstInput.length == 0) {
      this.setState({ firstInputMistake: 'Пустая строка!' });
      this.setState({ disabled: true });
    } else if (!this.state.regstr.test(this.state.firstInput)) {
      this.setState({ firstInputMistake: 'Не должно быть чисел и символов' });
      this.setState({ disabled: true });
    } else {
      this.setState({ firstInputMistake: '' });
      this.setState({ disabled: false });
    }
  }

  render() {
    return (
      <>
        <form>
          <h1>{this.Datas}</h1>
          <div>
            <p>Имя</p>
            <input
              value={this.state.firstInput}
              onChange={(e) => {
                this.setState({ firstInput: e.target.value }, () => {
                  this.solveFirstInput(e);
                });
              }}
              type="text"
              name="name"
              placeholder="Имя"
            />
            <div className="mistake">{this.state.firstInputMistake}</div>
            <p>Дата</p>
            <input
              type="date"
              id="start"
              name="date"
              value={this.state.secondInput}
              onChange={(e) => {
                this.setState({ secondInput: e.target.value });
              }}
              min="1950-01-01"
              max="2002-12-31"
            />
          </div>
          <div>
            <p>Дата</p>
            <select
              value={this.state.value}
              onChange={(e) => {
                this.setState({ value: e.target.value });
              }}
            >
              <option value="minsk">Mинск</option>
              <option value="gomel">Гомель</option>
              <option value="grodno">Гродно</option>
              <option value="brest">Брест</option>
            </select>
          </div>
          <div>
            <span>Молодой</span>
            <input
              type="checkbox"
              name="agree"
              checked={this.state.agree}
              onChange={(e) => {
                this.setState({ agree: e.target.checked });
                this.setState({ young: e.target.checked == true ? 'Молодой' : 'Не молодой' });
              }}
            />
          </div>
          <div>
            <span>Удалой</span>
            <input
              type="checkbox"
              name="agree2"
              checked={this.state.agree2}
              onChange={(e) => {
                this.setState({ agree2: e.target.checked });
                this.setState({ ydaloi: e.target.checked == true ? 'Удалой' : 'Не удалой' });
              }}
            />
          </div>
          <div>
            <p>Красавчик</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={this.state.agree3}
                onChange={(e) => {
                  this.setState({ agree3: e.target.checked });
                  this.setState({
                    handsome: e.target.checked == true ? 'Красавчик' : 'Такое себе',
                  });
                }}
              />
              <span className="slider" />
            </label>
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => {
                this.setState({ files: e.target.files }, () => {
                  const f = new FileReader();
                  if (this.state.files) {
                    f.readAsDataURL(this.state.files[0]);
                    console.log(this.state.files[0]);
                    f.onloadend = () => {
                      this.setState({ resFull: f.result });
                    };
                  }
                });
              }}
            />
          </div>
          <img src={this.state.resFull ? this.state.resFull : ''} />
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (this.state.firstInput.length == 0) {
                  this.setState({ firstInputMistake: 'Пустая строка!' });
                  this.setState({ disabled: true });
                } else if (!this.state.regstr.test(this.state.firstInput)) {
                  this.setState({ firstInputMistake: 'Не должно быть чисел и символов' });
                  this.setState({ disabled: true });
                } else {
                  this.setState({ firstInputMistake: '' });
                  this.setState({ disabled: false });
                  this.setState(
                    {
                      Arr: [
                        ...this.state.Arr,
                        {
                          firstInput: this.state.firstInput,
                          firstInputMistake: '',
                          disabled: false,
                          regstr: /^[a-zA-Zа-яА-ЯёЁ]+$/,
                          secondInput: this.state.secondInput,
                          value: this.state.value,
                          agree: false,
                          agree2: false,
                          agree3: false,
                          files: null,
                          resFull: this.state.resFull,
                          ydaloi: this.state.ydaloi,
                          young: this.state.young,
                          handsome: this.state.handsome,
                        },
                      ],
                    },
                    () => {
                      alert('эврисинг создано!');
                      this.setState({
                        firstInput: '',
                        secondInput: '2012-11-22',
                        value: 'minsk',
                        agree: true,
                        agree2: false,
                        agree3: true,
                        files: null,
                        resFull: '',
                        ydaloi: 'Не удалой',
                        young: 'Молодой',
                        handsome: 'Красавчик',
                      });
                    }
                  );
                }
              }}
              disabled={this.state.disabled}
            >
              Тест
            </button>
          </div>
        </form>
        <div className="full">
          {this.state.Arr.map((item, index) => (
            <div key={index}>
              <div>
                <img width="130px" src={item.resFull} />
              </div>
              <div>{item.secondInput}</div>
              <div>{item.young}</div>
              <div>{item.handsome}</div>
              <div>{item.firstInput}</div>
              <div>{item.value}</div>
              <div>{item.ydaloi}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default Searchy;
