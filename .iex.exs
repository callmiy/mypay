import Ecto.Query

alias Burda.Repo
alias Burda.Factory.Shift, as: ShiftFactory
alias Burda.Shift
alias Burda.Shift.Api, as: ShiftApi
alias Burda.Meta
alias Burda.Meta.Api, as: MetaApi
alias Burda.Factory, as: FactoryUtils
alias Burda.Factory.Meta, as: MetaFactory
alias BurdaWeb.LayoutView
alias BurdaWeb.IndexController
alias BurdaWeb.IndexView
alias BurdaWeb.ShiftController
alias BurdaWeb.ShiftView
alias BurdaWeb.Offline
alias Mix.Tasks.Deploy
alias Burda.OfflineSync
alias BurdaWeb.Schema
