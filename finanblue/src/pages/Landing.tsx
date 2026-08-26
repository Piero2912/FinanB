import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Wallet, Target, BarChart3 } from 'lucide-react';
import { Button, Card } from '../components/shared/index.js';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wallet,
      title: 'Registra',
      description: 'Controla tus ingresos y gastos',
    },
    {
      icon: BarChart3,
      title: 'Analiza',
      description: 'Comprende en qué utilizas tu dinero',
    },
    {
      icon: TrendingUp,
      title: 'Organiza',
      description: 'Establece presupuestos y límites',
    },
    {
      icon: Target,
      title: 'Ahorra',
      description: 'Define metas y controla tu progreso',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-600">FinanBlue</h1>
        <Button
          onClick={() => navigate('/')}
          variant="primary"
          size="md"
        >
          Entrar
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto">
        <div className="text-center space-y-6 mb-12 md:mb-16">
          <div className="text-5xl md:text-6xl">💰</div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
            Gestiona tus finanzas <span className="text-primary-600">inteligentemente</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            FinanBlue te ayuda a controlar cada soles, entender tus gastos y alcanzar tus metas financieras
          </p>
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            size="lg"
          >
            Comenzar ahora
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center p-8">
                <Icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Benefits */}
        <Card className="bg-primary-50 border-primary-200 p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">
            ¿Por qué elegir FinanBlue?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
              <p className="text-neutral-700">Privacidad - Datos locales</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">⚡</div>
              <p className="text-neutral-700">Rapidez - Sin dependencias</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">🎯</div>
              <p className="text-neutral-700">Objetivo - Tus metas</p>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-12 md:py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Comienza tu viaje financiero hoy
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          Totalmente gratis, sin registrarse, sin publicidad
        </p>
        <Button
          onClick={() => navigate('/')}
          variant="primary"
          size="lg"
        >
          Ir al Dashboard
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8 text-center text-neutral-600">
        <p>FinanBlue © 2026 - Gestión de Finanzas Personales</p>
      </footer>
    </div>
  );
};
