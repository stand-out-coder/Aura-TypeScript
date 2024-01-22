# Aura-TypeScript

**Aura** - это инновационный язык сценариев, написанный на TypeScript и основанный на нестрогой типизации. Разработанный специально для создания сложных консольных программ, Aura в настоящее время находится в начальной стадии разработки, причем над ним работают как разработчики, так и вся община.

Основные особенности Aura:

1. **Основа TypeScript:** Aura построен на TypeScript, используя его мощные возможности и обеспечивая прочное основание для беспроблемной разработки.

2. **Нестрогая типизация:** Принимая подход нестрогой типизации, Aura предлагает гибкость в обработке переменных, позволяя разработчикам сосредотачиваться на функциональности без жестких ограничений типов.

3. **Фокус на консольных программах:** Aura специально разработан для преуспевания в области высокоуровневых консольных программ. Его архитектура направлена на упрощение создания эффективных и функциональных консольных приложений.

4. **Активное участие сообщества:** Развитие Aura не ограничивается избранными разработчиками напротив, оно процветает благодаря коллективным усилиям динамичного и активного сообщества. Этот коллективный подход обеспечивает разнообразные точки зрения и быстрое развитие языка.

5. **Начальная стадия разработки:** Поскольку Aura все еще находится на начальной стадии разработки, разработчики имеют возможность внести свой вклад в формирование его эволюции. Эта фаза поощряет эксперименты и инновации, делая ее идеальным временем для тех, кто стремится стать частью формирующегося языка.

> Будь вы опытным разработчиком или новичком, Aura представляет захватывающую перспективу для исследования границ сценарных языков, предоставляя холст для творчества и эффективности в мире консольного программирования. Присоединяйтесь к сообществу, вносите свой вклад и станьте частью эволюции Aura!

---

   Запуск файла `program.ar` - `ts-node Main`, в скором времени добавится запуск сторонних файлов!

---

## **Документация**

### **Комментарии**

*Комментарии* - комментарии в программировании представляют собой текстовые фрагменты, которые игнорируются языком программирования. Они используются для добавления пояснений, объяснений или заметок в коде, которые не влияют на его выполнение, но помогают другим программистам или самому разработчику лучше понять смысл и назначение написанного кода.
```Js
// Однострочный комментарий
/*
Многострочный комментарий
*/
```

### **Типы данных**

*Тип данных* - в программировании, тип данных определяет характеристики и свойства данных. Каждый тип данных представляет собой набор значений:
1. **Тип данных bool(boolean)**:<br>
   Этот тип данных представляет собой два возможных состояния: "верно" или "неверно".
   ```Js
   bool(boolean) - 0, 1, false, true
   ```

2. **Тип данных str(string)**:<br>
   Этот тип данных называется строкой. Строка представляет собой последовательность символов, включая буквы, цифры, знаки препинания и другие
   символы, заключенные в кавычки. Даже если внутри строки содержатся цифры, компьютер трактует их как часть текста, а не как числа.
   ```js
   str(string) - "Hello, world!", "+12002.323", "-102", '0', "0", '102.0090'...
   ```

4. **Тип данных int(integer)**:<br>
   Тип данных, который включает в себя как целые числа, так и числа с плавающей точкой, обозначается как "числовой тип данных".
   ```Js
   int(integer) - 0, 1, 10002, +242323, -1234, 2323...
   ```

5. **Тип данных floating-point(float)**:<br>
   Этот тип данных охватывает все цифры и числа с дробной частью.
   ```Js
   floating-point(float) - 0.2323, 320.121212, -20302302.0, +232.3...
   ```

6. **Тип данных hexNum(HexNumber)**:<br>
   Этот тип представляет собой цвет в формате шестнадцатеричных чисел.
   ```Js
   hexNum(hexNumber) - #ff4500, #000000, #FFFFFF...
   ```

### **Объявление переменных**

*Переменная* - это можно сказать каробка в которую мы можем положыть какие-то данные.

```Js
название = данные
```

### **Вывод в консоль**

*Вывод в консоль* - это важная операция, которая широко используется во многих языках программирования. Её цель - отображение данных или информации в специальном окне, известном как консоль.

*Консоль* - представляет собой текстовый интерфейс, где программы могут взаимодействовать с пользователем путем вывода текста.

В Aura для вывода информации в консоль используется функция `output()`.

```Js
output("Hello, world!") // Выводит: Hello, world!
```

В данном коде мы использовали строку в виде аргумента, представленную типом данных `str` (или `string`), и передали ее в функцию `output()`. Затем функция вывела эту строку в консоль.

*Аргумент* - обозначает значение, которое передается функции при её вызове. Аргументы представляют собой данные или переменные, которые функция использует для выполнения своей работы.

Использование функции `output()` может быть таким:

```Js
output("Hello,", "world!") // Выводит: Hello,world!
```

В этом случае мы передали в функцию `output()` два аргумента "Hello," и "world!", функция слепила их в "Hello,world!", как видите, пробела нет. Вы можете добавить его в виде еще одного аргумента с пробелом по центру:

```Js
output("Hello", " ", "world!") // Выводит: Hello, world!
```

Но этот способ немного долгий, и мы можем сделать это короче, добавив пробел в один из аргументов:

```Js
output("Hello, ", "world!") // Выводит: Hello, world!
```

Можно также добавить еще пробел в "world!":

```Js
output("Hello, ", " world!") // Выводит: Hello, world!
```

Еще `output()` позволяет выводить не только простые числа и строки, но также результаты вычислений или выражений. Например:

```javascript
output(1 + 1); // Выводит: 2
```

Этот код демонстрирует, что мы можем использовать `output()` для отображения результата выражения `1 + 1`, что равно `2` 
образом, функция `output()` применима не только к отдельным значениям, но и к выражениям, которые могут включать в себя
математические операции и другие операции.

Также с помощью `output()` можно выводить переменные:

```Js
var1 = "Hello, world!"
output(var1) // Выводит: Hello, world!

var2 = 10
output(var2) // Выводит: 10
```

### **Операторы сравнения**

*Операторы сравнения* - они используются для сравнения двух значений и возвращают булевское (логическое) значение `true` (1) или `false` (0) в зависимости от результата сравнения.

```Js
<   - Меньше
>   - Больше
<=  - Меньше или равно
>=  - Больше или равно
==  - Равно
!=  - Не равно
```

Например, если мы введем `output(1 == 1)`, выведет 1 (true).

### **Операторы if, else if(elif), else**

Операторы `if`, `else if` (или `elif`), `else` - проще говоря, операторы для проверки. `if` означает "если", `else if` (или `elif`) - "иначе если", `else` - "иначе":

```Js
if (/* условие */) {
   // блок кода, который должен выполниться при возвращении условия true (1)
}
```

Давайте напишем простую программу, которая выведет "Вы взрослый!", если переменная `age` будет 18 или больше:

```Js
age = 14
if (age >= 18) {
   output("Вы взрослый!")
} // Ничего не выводит
```

Ничего не выводит, потому что `age < 18`, и в этом случае нам поможет `else`:

```Js
if (/* условие */) {
   // блок кода, который должен выполниться при возвращении условия true (1)
}
else {
   // блок кода, который должен выполниться при возвращении условия в if false (0)
}
```

С этими знаниями мы можем сделать так, чтобы если `age < 18`, выводило "Вы ребенок!":

```Js
age = 14
if (age >= 18) {
   output("Вы взрослый!")
}
else {
   output("Вы ребенок!")
} // Выводит "Вы ребенок!"
```

Теперь, при вводе 0, выводит "Вы ребенок!", а нам нужно, чтобы выводило "Ошибка: возраст равен 0!" и с этим нам поможет `else if`(`elif`):

```Js
age = 14
if (age >= 18) {
   output("Вы взрослый!")
}
elif (age == 0) {
   output("Ошибка: возраст равен 0!")
}
else {
   output("Вы ребенок!")
} // Выводит "Ошибка: возраст равен 0!"
```

### **Логические операторы**

*Логические операторы* - это специальные символы или ключевые слова, используемые в программировании для комбинирования и сравнения логических значений. 
Они позволяют создавать более сложные условия в выражениях и управлять выполнением кода в зависимости от различных логических условий.

```Js
and(&&) - Логическое "и"
or(||)  - Логическое "или"
```

Логические операторы используются для сравнения двух частей выражения и возвращают булевское значение (1 (true) или 0 (false)) в зависимости 
от результата. Давайте рассмотрим примеры:

1. Если мы введем следующий код: `output(1 == 2 || 3 == 3)` или `output(1 == 2 or 3 == 3)`, то результатом будет 1 (true).
Это потому, что оператор `or(||)` возвращает 1 (true), если хотя бы одно из условий верно. В данном случае, второе
условие `(3 == 3)` верно, поэтому весь оператор возвращает true.

2. С другой стороны, если мы введем `output(1 == 1 && 5 == 2)` или `output(1 == 1 and 5 == 2)`, то результатом будет 0 (false).
Здесь оператор `and(&&)` возвращает 1 (true) только в том случае, если оба условия верны. Однако в данном случае второе
условие `(5 == 2)` ложно, поэтому весь оператор возвращает 0 (false).

Таким образом, логические операторы позволяют нам комбинировать условия и принимать решения в зависимости от их выполнения.

Также можно использовать скобки для явного указания порядка выполнения частей выражения.

1. Если мы введем следующий код: `output((1 == 2 || 3 == 3) && 4 == 4)`, то результатом будет 1 (true). Здесь скобки вокруг
первой части выражения `(1 == 2 || 3 == 3)` гарантируют, что оператор `&&` будет применен к результату этой части
выражения и к последнему условию `(4 == 4)`. Поскольку оба условия внутри скобок верны, результат `&&` также будет 1 (true).

2. С другой стороны, если мы введем `output(1 == 1 && (5 == 2 || 4 == 4))`, то результатом также будет 1 (true).
Здесь скобки вокруг второй части выражения `(5 == 2 || 4 == 4)` гарантируют, что оператор `&&` будет применен к
результату первого условия `(1 == 1)` и к результату этой части выражения. Поскольку оба условия внутри скобок верны, результат `&&` также будет 1 (true).

Таким образом, использование скобок позволяет контролировать порядок выполнения условий и получать более точные результаты.

С этими знаниями мы можем улучшить нашу программу, которая проверяет возраст:

```Js
age = 0
if (age >= 18 and age != 0) {
   output("Вы взрослый!")
}
else {
   output("Вы ребенок!")
} // Выводит "Ошибка: возраст равен 0!"
```

<p>Этим мы сократили код, но теперь не выводит ошибку при возрасте 0.</p>

### **Циклы for, while, do-while**

*Циклы* - это конструкции, которые используются для повторения определенных действий или кода.

#### Цикл `for`:
```Js
for (/* инициализация переменной */, /* условие продолжения */, /* выражение после каждой итерации */) {
   // Блок кода, который будет выполняться, пока условие возвращает true (1)
}
```

Давайте представим, что мы хотим вывести "Hello, world!" семь раз:
```Js
output("Hello, world!")
output("Hello, world!")
output("Hello, world!")
output("Hello, world!")
output("Hello, world!")
output("Hello, world!")
output("Hello, world!")
```

Теперь давайте это сделаем, используя цикл `for`:
```Js
for (i = 0, i < 7, i = i + 1) {
   output("Hello, world!")
}
```
Здесь мы инициализируем переменную `i` с начальным значением `0`. Условие `i < 7` проверяет, что `i` меньше 7. После каждой итерации выполняется выражение `i++`, которое увеличивает значение `i` на 1.

*Инкремент* - это **увеличение** значения на `1`. <br>
*Декремент* - это **уменьшение** значения на `1`.

#### Цикл `while`

Цикл `while` представляет собой простой способ организации повторяющихся операций. В отличие от цикла `for`, он более прост в использовании, но может быть менее удобным в некоторых случаях.

Пример синтаксиса цикла `while`:
```Js
while (/* условие продолжения */) {
   // Блок кода, выполняющийся, пока условие возвращает true (1)
}
```

Давайте использовать цикл `while` для вывода фразы "Hello, world!" семь раз:
```Js
i = 0;
while (i < 7) {
   output("Hello, world!")
   i = i + 1
}
```

Кроме того, мы можем создать бесконечный цикл:
```Js
while (true) {
   output("Hello, world!")
}
```

Будьте осторожны с бесконечными циклами, так как они могут привести к зависанию программы или даже компьютера в редких случаях!

#### Цикл `do while`

Цикл `do while` представляет собой вариант цикла `while`, где блок кода выполняется хотя бы один раз перед проверкой условия.

Пример синтаксиса цикла `do while`:
```Js
do {
   // Блок кода, выполняющийся, пока условие возвращает true (1)
} while (/* условие продолжения */)
```

Пример использования цикла `do while`:
```Js
i = 0;
do {
   output("Hello, world!")
   i = i + 1
} while (i < 7)
```
---
