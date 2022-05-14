(function() {
    //Создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title 
        return appTitle
    }

    //Создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form')
        let input = document.createElement('input')
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')

        form.classList.add('input-group', 'mb-3')
        input.classList.add('form-control')
        input.placeholder = 'Введите название нового дела'
        buttonWrapper.classList.add('input-group-append')
        button.classList.add('btn', 'btn-primary')
        button.textContent = 'Добавить дело'

        buttonWrapper.append(button)
        form.append(input)
        form.append(buttonWrapper)

        return {
            form,
            input,
            button
        }
    }

    //Создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }

    function createTodoItem(name) {
        let item = document.createElement('li')
        //Кнопки помещаются в один элемент, чтобы весь список показывался красиво в одной группе
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        //Устанавливаем стили для элементов и кнопок
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        item.textContent = name

        buttonGroup.classList.add('btn-group', 'btn-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить'

        //Вкладываем кнопки в один элемент
        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)

        //Возвращаем все элементы, чтобы обрабатывать нажатия
        return {
            item,
            doneButton,
            deleteButton
        }
    }

    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm()
        let todoList = createTodoList()

        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)

        //По нажатию на кнопку "Добавить дело" будет выполняться функция
        todoItemForm.form.addEventListener('submit', function(e) {
            //Отменяем стандартное поведение браузера
            e.preventDefault()

            //Если в поле ничего не введено, то ничего не выполняем
            if (!todoItemForm.input.value) {
                return
            }

            let todoItem = createTodoItem(todoItemForm.input.value)


            //Добавляем обработчики событий на кнопки
            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success')
            })
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove()
                }
            })

            //Создаем и добавляем элемент из поля для ввода
            todoList.append(todoItem.item)

            //Очищаем поле
            todoItemForm.input.value = ''
        })
    }

    window.createTodoApp = createTodoApp;
}) ();

