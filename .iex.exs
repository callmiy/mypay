import Ecto.Query

alias MyPay.Repo
alias MyPay.Factory.Shift, as: ShiftFactory
alias MyPay.Shift
alias MyPay.Shift.Api, as: ShiftApi
alias MyPay.Meta
alias MyPay.Meta.Api, as: MetaApi
alias MyPay.Factory, as: FactoryUtils
alias MyPay.Factory.Meta, as: MetaFactory
alias MyPayWeb.LayoutView
alias MyPayWeb.IndexController
alias MyPayWeb.IndexView
alias MyPayWeb.ShiftController
alias MyPayWeb.ShiftView
alias MyPayWeb.Offline
alias Mix.Tasks.Deploy
alias MyPay.OfflineSync
alias MyPayWeb.Schema
