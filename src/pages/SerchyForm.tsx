import { Component } from 'react';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Choice(a: any, b: any) {
  return a ? a : b;
}
function SearchyForm() {
  const Datas = 'Данные';
  const Name = 'Имя';
  const Calendar = 'Дата';
  const regstr = /^[a-zA-Zа-яА-ЯёЁ]+$/;

  const [firstInput, setFirstInput] = useState('');
  const [firstInputMistake, setfirstInputMistake] = useState('');
  const [secondInput, setSecondInput] = useState('2012-11-22');
  const [value, setValue] = useState('minsk');
  const [agree, setAgree] = useState(true);
  const [young, setYoung] = useState('Молодой');
  const [daring, setDaring] = useState(false);
  const [daringIdentity, setDaringIdentity] = useState('Не удалой');
  const [handsome, setHandsome] = useState(true);
  const [handsomeIdentity, setHandsomeIdentity] = useState('Красавчик');
  const [files, setFiles] = useState<File | null>(null);
  const [resFull, setResFull] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [preparedForm, setPreparedForm] = useState([
    {
      firstInput: firstInput,
      firstInputMistake: firstInputMistake,
      disabled: disabled,
      secondInput: '',
      value: '',
      resFull: resFull,
      ydaloi: '',
      young: '',
      handsome: '',
    },
  ]);

  function solveFirstInput() {
    if (firstInput.length == 0) {
      setfirstInputMistake('Введите Имя!');
      setDisabled(true);
    } else if (!regstr.test(firstInput)) {
      setfirstInputMistake('Не должно быть чисел и символов');
      setDisabled(true);
    } else {
      setfirstInputMistake('');
      setDisabled(false);
    }
  }
  useEffect(() => {
    solveFirstInput();
  }, [firstInput]);
  useEffect(() => {
    const f = new FileReader();
    if (files) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      f.readAsDataURL(files[0]);
      f.onloadend = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setResFull(f.result);
      };
    }
  }, [files]);

  return (
    <>
      <form>
        <h1>{Datas}</h1>

        <p>{Name}</p>
        <input
          value={firstInput}
          onChange={(e) => {
            setFirstInput(e.target.value);
          }}
          type="text"
          name="name"
          placeholder="Имя"
        />
        <div className="mistake">{firstInputMistake}</div>
        <p>{Calendar}</p>
        <input
          type="date"
          id="start"
          name="date"
          value={secondInput}
          onChange={(e) => {
            setSecondInput(e.target.value);
          }}
          min="1950-01-01"
          max="2002-12-31"
        />
        <div>
          <p>Дата</p>
          <select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
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
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked);
              setYoung(e.target.checked == true ? 'Молодой' : 'Не молодой');
              setSecondInput('2012-11-22');
            }}
          />
        </div>
        <div>
          <span>Удалой</span>
          <input
            type="checkbox"
            name="agree2"
            checked={daring}
            onChange={(e) => {
              setDaring(e.target.checked);
              setDaringIdentity(e.target.checked == true ? 'Удалой' : 'Не удалой');
            }}
          />
        </div>
        <div>
          <p>Красавчик</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={handsome}
              onChange={(e) => {
                setHandsome(e.target.checked);
                setHandsomeIdentity(e.target.checked == true ? 'Красавчик' : 'Такое себе');
              }}
            />
            <span className="slider" />
          </label>
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setFiles(e.target.files);
            }}
          />
        </div>
        <img src={Choice(resFull, '')} />
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPreparedForm([
                ...preparedForm,
                {
                  firstInput: firstInput,
                  firstInputMistake: firstInputMistake,
                  disabled: disabled,
                  secondInput: secondInput,
                  value: value,
                  resFull: resFull,
                  ydaloi: daringIdentity,
                  young: young,
                  handsome: handsomeIdentity,
                },
              ]);
              setFirstInput('');
              setfirstInputMistake('');
              setSecondInput('2012-11-22');
              setValue('minsk');
              setDaringIdentity('Не удалой');
              setHandsomeIdentity('Красавчик');
              setYoung('Молодой');
              setAgree(true);
              setDaring(false);
              setHandsome(true);
              setFiles(null);
              setDisabled(true);
              setResFull('');
              alert('эврисинг создано!');
            }}
            disabled={disabled}
          >
            Тест
          </button>
        </div>
      </form>
      <div className="full">
        {preparedForm.map((item, index) => (
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
export { SearchyForm };
