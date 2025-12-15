# 魔兽世界宏命令

## 功能性
```
/tar 目标名字

/stopmacro [noexists]

/script SetRaidTarget("target",6)
```
- 选中目标
- 目标不存在取消后续动作
- 标记方块

---

显示坐骑特效动作

```
/mountspecial
```


## 战斗相关
```SHELL
#showtooltip 复苏之雾 
```
在技能栏上显示 “复苏之雾” 的图标、冷却时间和能量消耗（而非默认的宏图标），方便直观判断技能状态。

```SHELL 
/cast [target=mouseover,help][target=target,help,exists][target=player] 复苏之雾

```

/cast [条件 1][条件 2][条件 3] 复苏之雾

- [target=mouseover,help]：优先对 “鼠标当前悬浮指向” 的目标施法（需满足 “help” 条件，即该目标是友方 / 可治疗目标，如队友、自己）；
- [target=target,help,exists]：若鼠标无悬浮友方目标，则对 “当前选中的目标” 施法（需满足 “目标存在” 且 “是友方”，比如手动选中队友时）；
- [target=player]：若前两个条件都不满足（如无选中目标、选中目标是敌人），则自动对 “玩家自身” 施法，避免技能放空。

```SHELL
/cast [@cursor] 暴风雪
```

鼠标指向宏

## 系统设置相关

```LUA
显示头衔：
/console UnitNamePlayerPVPTitle 1
隐藏头衔：
/console UnitNamePlayerPVPTitle 0

显示公会名称:
/console UnitNamePlayerGuild 1
隐藏公会名称：
/console UnitNamePlayerGuild 0

人物旋转速度：(后面数字越大，转的越快，400为游戏默认值)
/console turnspeed 400

恢复默认设置(慎用)：此命令恢复所有界面设置
/console cvar_default
```