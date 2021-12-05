module Main exposing (..)
import Browser
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Task


-- MAIN

main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }

type alias Todo =
  { id : String
  , description : String
  , done: Bool
  }

-- MODEL

type alias Model =
  { todos : List Todo }

init : () -> (Model, Cmd Msg)
init _ =
  (Model [(Todo "0" "new" True)]
  , Cmd.none
  )

-- UPDATE

type Msg
  = Todos (List Todo)
  | AddTodo Todo
  | ToggleTodo String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Todos newTodos ->
      ({ model | todos = newTodos }
      , Cmd.none
      )

    AddTodo todo ->
      ({ model | todos = model.todos ++ [todo] }
      , Cmd.none
      )

    ToggleTodo todoId ->
      ({ model | todos = List.indexedMap (\i x -> if x.id == todoId then { x | done = not x.done } else x) model.todos }
      , Cmd.none
      )

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none

-- VIEW

view : Model -> Html Msg
view model =
  div [] [
    h1 [] [ text "Top" ]
    , fieldset [] (List.map renderTodo model.todos)
    , button [ onClick (AddTodo (Todo "0" "new" False)) ] [ text "Add Todo" ]
    ]

renderTodo : Todo -> Html Msg
renderTodo todo =
  checkbox (ToggleTodo todo.id) todo.description todo.done

checkbox : Msg -> String -> Bool -> Html Msg
checkbox msg name isChecked =
  label
    [ style "padding" "20px" ]
    [ input [ type_ "checkbox", checked isChecked, onClick msg ] []
    , text name
    ]