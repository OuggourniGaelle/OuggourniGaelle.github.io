# -*- coding: utf-8 -*-
"""
Created on Thu Mar  8 14:41:09 2018

@author: Thomas
"""

#import necessary libraries
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

#Analyse des médailles 2018 en fonction de la richesse (G7 & UE)

#read files with data
Path = ""
df = pd.read_csv(Path+"medailles-2018.txt", sep="\t")

df.to_csv("medailles-2018.csv", sep=",",index=False)

#Affiche tableau des medailles
nb = df[['Pays','TT','Rang']]
nb.sort_values(by=["Rang"],ascending=False).plot(y="TT",x="Pays",kind="barh",figsize=(12,8))

G7_old = ['États-Unis', 'Japon', 'Allemagne', 'France', 'Russie', 'Royaume-Uni', 'Italie', 'Canada'] #Remplace Roy-Uni=>GB + Russie par OAR

G7 = ['États-Unis', 'Japon', 'Allemagne', 'France', 'OAR', 'Grande-Bretagne', 'Italie', 'Canada']

#df[df['Pays']=='États-Unis']

TTG7=0 #Total medailles G7

for v in G7:
    idf=df[df['Pays']==v]
    if ( idf['TT'].empty == False ):
        #print("Pays TT :",v,idf.iloc[0]['TT'])
        TTG7=TTG7+idf.iloc[0]['TT']

print ("Total G7/Total:",TTG7,np.sum(df['TT']))  

labels = 'G7', 'Autres'
mvalG7 = [ 0, 0]
mvalG7[0]=TTG7
mvalG7[1]=np.sum(df['TT'])-TTG7
plt.pie(mvalG7, labels=labels, autopct='%.0f%%', shadow=True,startangle=90)
#Note: G7/8 represente 12,2% de la population mondiale

#UE = [Allemagne', 'France', 'Grande-Bretagne', 'Italie', 'Autriche',Belgique,Bulgarie,Chypre,Croatie,]
UE= ['Allemagne','Autriche','Belgique','Bulgarie','Chypre','Croatie','Danemark', 'Espagne',
     'Estonie','Finlande','France','Grèce','Hongrie','Irlande',
     'Italie', 'Lettonie', 'Lituanie', 'Luxembourg', 'Malte', 'Pays-Bas', 'Pologne',
     'Portugal', 'Rép. tchèque', 'Roumanie','Grande-Bretagne','Slovaquie','Slovénie', 'Suède']

TTUE=0 #Total medailles UE

for v in UE:
    idf=df[df['Pays']==v]
    if ( idf['TT'].empty == False ):
        print("Pays TT :",v,idf.iloc[0]['TT'])
        TTUE=TTUE+idf.iloc[0]['TT']

print ("Total UE/Total:",TTUE,np.sum(df['TT']))  

labels = 'UE', 'Autres'
mvalUE = [ 0, 0]
mvalUE[0]=TTUE
mvalUE[1]=np.sum(df['TT'])-TTUE
plt.pie(mvalUE, labels=labels, autopct='%.0f%%', shadow=True,startangle=90)

#Note: En 2017, UE represente 511 sur 7,55 soit 6,7% de la population mondiale