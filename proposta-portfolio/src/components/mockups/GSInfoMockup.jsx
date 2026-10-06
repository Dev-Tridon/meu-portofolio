import React from 'react';
import {
  LayoutDashboard, Package, MonitorPlay, Users, CircleDollarSign, Settings,
  Clock, Plus, Map, ChefHat, RefreshCcw, TrendingUp, UsersRound,
  ArrowUpRight, ArrowDownRight, MoreHorizontal
} from 'lucide-react';

export default function GSInfoMockup() {
  return (
    <div className="w-full h-full bg-[#f4f7f6] rounded-2xl overflow-hidden flex font-sans text-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-slate-200/20 relative group/mockup">
      
      {/* SIDEBAR */}
      <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-6 z-10 shadow-sm shrink-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 cursor-pointer">
          <LayoutDashboard className="w-4 h-4 text-emerald-600" />
        </div>
        
        <div className="flex flex-col gap-6 text-slate-400">
          <Package className="w-5 h-5 hover:text-emerald-500 cursor-pointer transition-colors hover:scale-110" />
          <MonitorPlay className="w-5 h-5 hover:text-emerald-500 cursor-pointer transition-colors hover:scale-110" />
          <Users className="w-5 h-5 hover:text-emerald-500 cursor-pointer transition-colors hover:scale-110" />
          <CircleDollarSign className="w-5 h-5 hover:text-emerald-500 cursor-pointer transition-colors hover:scale-110" />
        </div>

        <div className="mt-auto">
          <Settings className="w-5 h-5 text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors hover:rotate-90" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 leading-tight">Dashboard</h1>
              <p className="text-[10px] text-slate-500 font-medium">Segunda-Feira, 20 de Setembro</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Clock className="w-3.5 h-3.5" />
              10:13:42 PM
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 shadow-sm cursor-help">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Servidor Ativo
              </div>
            </div>
          </div>
        </div>

        {/* DASHBOARD BODY */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#f4f7f6] custom-scrollbar relative">
          
          {/* Header Actions */}
          <div className="mb-6 relative z-10">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Visão Geral Operacional</h2>
            <p className="text-xs text-slate-500 font-medium mb-4">Atualizado em: tempo real</p>
            
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 hover:-translate-y-0.5 transition-all shadow-md shadow-emerald-500/20 active:scale-95">
                <Plus className="w-3.5 h-3.5" />
                Novo Atendimento (Caixa)
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 hover:shadow transition-all active:scale-95">
                <Map className="w-3.5 h-3.5" />
                Mapa de Mesas
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 hover:shadow transition-all active:scale-95">
                <ChefHat className="w-3.5 h-3.5" />
                KDS / Cozinha
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 border border-emerald-100 rounded-lg text-xs font-bold hover:bg-emerald-50 hover:shadow transition-all active:scale-95 ml-auto group">
                <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                Atualizar Métricas
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
            <MetricCard title="FATURAMENTO TOTAL" value="14.850,00 MT" trend="+15.2%" isPositive={true} icon={CircleDollarSign} desc="vs. semana passada" />
            <MetricCard title="MESAS ATENDIDAS" value="142" trend="-3.1%" isPositive={false} icon={Map} desc="em andamento e fechadas" />
            <MetricCard title="TOTAL DE CLIENTES" value="384" trend="+8.4%" isPositive={true} icon={UsersRound} desc="registados no período" />
            <MetricCard title="FATURAMENTO ANTERIOR" value="12.900,00 MT" trend="+2.5%" isPositive={true} icon={TrendingUp} desc="histórico de avanço" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 relative z-10">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Fluxo de vendas por Período</h3>
                  <p className="text-[10px] text-slate-400">Volume financeiro acumulado ao longo do expediente</p>
                </div>
                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded cursor-pointer hover:bg-emerald-100 transition-colors">Hoje</div>
              </div>
              <div className="flex-1 relative min-h-[160px] w-full flex items-end overflow-hidden group/chart cursor-crosshair">
                
                {/* Custom Tooltip Line on Hover */}
                <div className="absolute left-[50%] top-0 bottom-6 w-px bg-slate-300 opacity-0 group-hover/chart:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute left-[50%] top-[40px] w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white opacity-0 group-hover/chart:opacity-100 transition-opacity pointer-events-none -translate-x-1/2" />
                <div className="absolute left-[50%] top-[10px] -translate-x-1/2 bg-slate-800 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover/chart:opacity-100 transition-opacity pointer-events-none">
                  8.420 MT
                </div>

                <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                  <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                  
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="chartGradPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path d="M0,80 L50,75 L100,50 L150,60 L200,45 L250,70 L300,55 L350,20 L400,60 L400,100 L0,100 Z" fill="url(#chartGradPurple)" />
                  <path d="M0,80 L50,75 L100,50 L150,60 L200,45 L250,70 L300,55 L350,20 L400,60" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 4" />

                  <path className="transition-all duration-1000 [stroke-dasharray:1000] [stroke-dashoffset:0] group-hover/mockup:[stroke-dashoffset:0]" d="M0,85 L50,80 L100,40 L150,50 L200,30 L250,65 L300,45 L350,10 L400,50" fill="none" stroke="#10b981" strokeWidth="2.5" />
                  <path d="M0,85 L50,80 L100,40 L150,50 L200,30 L250,65 L300,45 L350,10 L400,50 L400,100 L0,100 Z" fill="url(#chartGrad)" />
                  
                  <circle cx="100" cy="40" r="3" fill="#10b981" stroke="white" strokeWidth="1.5" className="hover:r-4 transition-all cursor-pointer" />
                  <circle cx="200" cy="30" r="3" fill="#10b981" stroke="white" strokeWidth="1.5" className="hover:r-4 transition-all cursor-pointer" />
                  <circle cx="350" cy="10" r="3" fill="#10b981" stroke="white" strokeWidth="1.5" className="hover:r-4 transition-all cursor-pointer" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col items-center justify-center relative hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-5 left-5 text-left w-full">
                <h3 className="text-sm font-bold text-slate-800">Distribuição</h3>
                <p className="text-[10px] text-slate-400">Por Categoria</p>
              </div>
              <div className="mt-10 mb-4 relative w-32 h-32 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-500 cursor-pointer shadow-sm group/donut"
                   style={{
                     background: 'conic-gradient(#10b981 0% 45%, #8b5cf6 45% 75%, #0ea5e9 75% 100%)'
                   }}>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner relative">
                  <span className="text-sm font-black text-slate-700 transition-opacity duration-300 group-hover/donut:opacity-0">100%</span>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-emerald-600 opacity-0 transition-opacity duration-300 group-hover/donut:opacity-100">45%</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-bold text-slate-600 mt-2">
                <div className="flex items-center gap-1 hover:text-emerald-600 transition-colors cursor-pointer"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Bebidas</div>
                <div className="flex items-center gap-1 hover:text-purple-600 transition-colors cursor-pointer"><div className="w-2 h-2 rounded-full bg-purple-500" /> Pratos</div>
                <div className="flex items-center gap-1 hover:text-sky-600 transition-colors cursor-pointer"><div className="w-2 h-2 rounded-full bg-sky-500" /> Outros</div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 relative z-10 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">Atendimentos Recentes</h3>
              <span className="text-[10px] px-2 py-1 bg-slate-50 rounded text-emerald-600 font-bold hover:bg-emerald-50 transition-colors cursor-pointer">Ver Todos</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <th className="pb-3 font-semibold w-24">ID</th>
                    <th className="pb-3 font-semibold">Local / Mesa</th>
                    <th className="pb-3 font-semibold">Operador</th>
                    <th className="pb-3 font-semibold">Valor</th>
                    <th className="pb-3 font-semibold">Estado</th>
                    <th className="pb-3 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group/row">
                    <td className="py-3 font-mono text-slate-500 group-hover/row:text-emerald-600 transition-colors">#1042</td>
                    <td className="py-3 font-bold text-slate-700">Mesa 04</td>
                    <td className="py-3">Carlos M.</td>
                    <td className="py-3 font-bold">1.450,00 MT</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[9px] font-bold border border-amber-100">Em preparo</span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="p-1 hover:bg-white rounded text-slate-400 hover:text-emerald-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group/row">
                    <td className="py-3 font-mono text-slate-500 group-hover/row:text-emerald-600 transition-colors">#1041</td>
                    <td className="py-3 font-bold text-slate-700">Mesa 12</td>
                    <td className="py-3">Ana S.</td>
                    <td className="py-3 font-bold">3.200,00 MT</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold border border-emerald-100">Concluído</span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="p-1 hover:bg-white rounded text-slate-400 hover:text-emerald-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer group/row">
                    <td className="py-3 font-mono text-slate-500 group-hover/row:text-emerald-600 transition-colors">#1040</td>
                    <td className="py-3 font-bold text-slate-700">Balcão 02</td>
                    <td className="py-3">Pedro J.</td>
                    <td className="py-3 font-bold">850,00 MT</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold border border-emerald-100">Concluído</span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="p-1 hover:bg-white rounded text-slate-400 hover:text-emerald-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, isPositive, icon: Icon, desc }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer group/card hover:-translate-y-1 transform">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] font-black tracking-wider text-slate-500 group-hover/card:text-slate-700 transition-colors">{title}</span>
        <div className="w-6 h-6 rounded bg-emerald-50 flex items-center justify-center group-hover/card:bg-emerald-500 transition-colors duration-300">
          <Icon className="w-3.5 h-3.5 text-emerald-600 group-hover/card:text-white transition-colors duration-300" />
        </div>
      </div>
      <div>
        <div className="text-xl font-black text-slate-800 tracking-tight group-hover/card:text-emerald-700 transition-colors duration-300">{value}</div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 transition-colors ${isPositive ? 'bg-emerald-50 text-emerald-600 group-hover/card:bg-emerald-100' : 'bg-rose-50 text-rose-600 group-hover/card:bg-rose-100'}`}>
            {isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
            {trend}
          </span>
          <span className="text-[9px] text-slate-400 font-medium group-hover/card:text-slate-500 transition-colors">{desc}</span>
        </div>
      </div>
    </div>
  );
}
