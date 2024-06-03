import React, { useMemo, useState, type FC } from 'react';
import { IMainList } from './type';
import { getMainList, setBase, setTF, setZW } from './utils';
import '../rem'
import './index.scss';

const Tweleve: FC<Element> = () => {
  const [num, setNum] = useState(0);
  // 存放锁定后数据的列表
  const [saveList, setSaveList] = useState<IMainList[]>([]);
  // 是否锁定紫微的位置
  const [isLock, setIsLock] = useState(0);
  const list = useMemo(() => {
    const b = getMainList(num);
    if (!isLock) {
      const z = setZW(num, b);
      const t = setTF(num, z);
      const f = setBase(num, t);
      if (!isLock) {
        setSaveList(f);
      }
      return f;
    } else {
      return setBase(num, saveList);
    }
  }, [num, isLock]);

  return (
    <>
      <div className="lock">
        <span>锁定紫微位置</span>
        <input
          type="checkbox"
          id="myCheckbox"
          name="锁定紫微位置"
          onChange={(v) => setIsLock(v.target.checked ? 1 : 0)}
          value={isLock}
        ></input>
      </div>
      <div className="main">
        {list.map((v) => {
          return (
            <div
              className={v.class}
              data-index={v.index}
              key={`${v.index + v.class + v.title}`}
              onClick={() => setNum(v.index)}
            >
              {v.mainList.length && (
                <div className="star-box">
                  {v.mainList.map((l, index) => (
                    <span className="main-star" key={l + index}>
                      {l}
                    </span>
                  ))}
                </div>
              )}
              <span className="dz">{v.title}</span>
              <div className="baseName">
                <span>{v.baseName}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h4>该页用于熟悉星系分布，适用2个场景：</h4>
        <p>1. 紫微星在不同宫位时，其他星系分布</p>
        <p>2. 锁定紫微盘型后，命宫坐不同宫位时，其他星系的分布</p>
      </div>
    </>
  );
};

export default Tweleve;
