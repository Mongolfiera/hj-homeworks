Испорченные комментарии
===

Вам предстоит решить задачу об испорченных комментариях. Слева как комментарии выглядят сейчас, справа как они должны выглядеть.
![Комментарии](https://github.com/netology-code/hj-homeworks/blob/master/dom-from-zero/comments/res/preview.png)

В задаче используется небезопасный `innerHTML`, использование которого не только привело к «порче» текста комментария, но и позволяет осуществить XSS-атаку на пользователей сайта.

## Требования

В целях безопастности, нельзя использовать `innerHTML` в этой задаче.

### Локально с использованием git

Необходимо изменить  `./js/comments.js`. Файл уже подключен к документы, поэтому другие файлы изменять не требуется.

### В песочнице CodePen

Внесите изменения во вкладке JS. Перед началом работы сделайте форк этого пена:

https://codepen.io/dfitiskin/pen/aLbRex