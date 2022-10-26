import React, { useEffect, useState } from 'react';
import { Cards } from './Cards';
import Searchy from './Searchy';
import { SearchyForm } from './SerchyForm';
const ApiKey = '200750a91ad133284308acda4ca0a404';

function PrepareCards() {
  const [lineValue, setValue] = useState('cars');
  const [Arr, setArr] = useState([{ image: '', index: 1, title: '' }]);
  const [Change, setChange] = useState('');
  const [ModalData, setModalData] = useState({ image: '', index: 1, title: '' });
  const [ScreenData, setScreenData] = useState('non_modal_wrapper');
  const [firstInputMistake, setfirstInputMistake] = useState('');
  const [checkedTitle, setCheckedTitle] = useState('modal_wrapper');
  const [handsome, setHandsome] = useState(true);
  const [handsomeIdentity, setHandsomeIdentity] = useState('Красавчик');
  const [disabled, setDisabled] = useState(true);
  const regstr = /^[a-zA-Zа-яА-ЯёЁ]+$/;

  function solveFirstInput() {
    if (lineValue.length == 0) {
      setfirstInputMistake('Введите Название!');
      setDisabled(true);
    } else if (!regstr.test(lineValue)) {
      setfirstInputMistake('Не должно быть чисел и символов');
      setDisabled(true);
    } else {
      setfirstInputMistake('');
      setDisabled(false);
    }
  }

  const MakeSure = () => {
    fetch(
      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
        ApiKey +
        '&tags=' +
        lineValue +
        '&per_page=10&page=1&format=json&nojsoncallback=1'
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then((solve) => {
        console.log(solve);
        const Arr = solve.photos.photo.map(
          (
            q: {
              title: string;
              farm: string;
              server: string;
              id: string;
              secret: string;
            },
            index: number
          ) => {
            const final =
              'https://farm' +
              q.farm +
              '.staticflickr.com/' +
              q.server +
              '/' +
              q.id +
              '_' +
              q.secret +
              '.jpg';

            return { image: final, index: q.id, title: q.title };
          }
        );
        setArr(Arr);
      });
  };
  useEffect(() => {
    MakeSure();
  }, [Change]);
  useEffect(() => {
    solveFirstInput();
  }, [lineValue]);

  return (
    <>
      <div
        onClick={() => {
          setScreenData('non_modal_wrapper');
        }}
        className={`modal_wrapper_char ${ScreenData}`}
      ></div>
      <div className={`modal_inside ${ScreenData}`}>
        <img
          className="modal_closebtn_characteristic cursor_position"
          onClick={() => {
            setScreenData('non_modal_wrapper');
          }}
          width="50px"
          src="https://i.ibb.co/swD9xWx/1.jpg"
          alt="photo"
        />
        <img
          className="modal_img_charachteristic"
          width="300px"
          src={ModalData.image}
          alt="photo"
        />
        <p className="modal_text">Фотография по запросу № {ModalData.index}</p>
        <p className="modal_text">Запрос должен включать в себя :{lineValue}</p>
        <p className="modal_text"> Название фотографии: {ModalData.title}</p>
      </div>
      <form>
        <p>Поиск изображений:</p>
        <p>
          <input
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setChange(lineValue);
                setScreenData('non_modal_wrapper');
              }
            }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
            name="name"
            placeholder="Поиск..."
            value={lineValue}
          />
          <span className="mistake">{firstInputMistake}</span>
        </p>
  
        <button
          className="search_window"
          onClick={(e) => {
            e.preventDefault();
            setChange(lineValue);
            setScreenData('non_modal_wrapper');
          }}
          disabled={disabled}
        >
          Поиск
        </button>
        <div>
          <p className="search_window">Отображение Названия</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={handsome}
              onChange={(e) => {
                setHandsome(e.target.checked);
                setCheckedTitle(e.target.checked == true ? 'modal_wrapper' : 'non_modal_wrapper');
              }}
            />
            <span className="slider" />
          </label>
        </div>
      </form>
      <div className="full_cards search_window">
        {Arr.map((item) => (
          <div key={item.index}>
            <div
              onClick={(e) => {
                setModalData(item);
                setScreenData('modal_wrapper');
              }}
            >
              <img width="130px" className="cursor_position" src={item.image} />
              <p className={`main_title ${checkedTitle}`}>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export { PrepareCards };
